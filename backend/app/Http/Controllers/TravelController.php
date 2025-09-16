<?php

namespace App\Http\Controllers;

use App\Models\Penumpang;
use App\Models\Travel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TravelController extends Controller
{
    public function index(){
        $travels = Penumpang::with('travel')->get();
        return response()->json($travels, 200);
    }

    public function show(){

    }

    public function travel(){
        $travel = Travel::all();
        return response()->json($travel, 200);
    }

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nama' => 'required',
        'jenis_kelamin' => 'required',
        'kota' => 'required',
        'usia' => 'required',
        'id_travel' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $usia = $this->parseUsia($request->usia);
    if ($usia <= 0) {
        return response()->json(['message' => 'Format usia tidak valid'], 422);
    }

    $cekPenumpang = Penumpang::where('nama', strtoupper($request->nama))->where('usia', $usia)->where('kota', strtoupper($request->kota))->where('id_travel', $request->id_travel)->exists();

    if ($cekPenumpang) {
        return response()->json([
            'message' => 'Penumpang sudah terdaftar di travel ini'
        ], 422);
    }

    $nama = strtoupper($request->nama);
    $kota = strtoupper($request->kota);

    $tahun = date('y');
    $bulan = date('m');

    $idTravel = str_pad($request->id_travel, 4, '0', STR_PAD_LEFT);

    $count = Penumpang::where('id_travel', $request->id_travel)->count() + 1;
    $nomorUrut = str_pad($count, 4, '0', STR_PAD_LEFT);

    $kodeBooking = $tahun . $bulan . $idTravel . $nomorUrut;

    $travel = Travel::where('id', $request->id_travel)->first();

    if ($travel->kuota <= 0) {
        return response()->json([
            'message' => 'Kuota travel sudah habis'
        ], 422);
    }

    $travel->kuota -= 1;
    $travel->save();

    $tahunlahir = date('Y') - $usia;

    $penumpang = Penumpang::create([
        'nama' => $nama,
        'jenis_kelamin' => $request->jenis_kelamin,
        'kota' => $kota,
        'usia'  => $usia,
        'tahun_lahir' => $tahunlahir,
        'id_travel' => $request->id_travel,
        'kode_booking' => $kodeBooking
    ]);

    return response()->json([
        'message' => 'Berhasil menambahkan data penumpang',
        'penumpang' => $penumpang
    ], 200);
}


    private function parseUsia($input)
    {
        $usia = preg_replace('/\s*(tahun|thn|th)\s*/i', '', $input);
        return (int) $usia;
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'jenis_kelamin' => 'required',
            'kota' => 'required',
            'usia' => 'required|integer',
            'id_travel' => 'required|exists:travel,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $penumpang = Penumpang::find($id);
        if (!$penumpang) {
            return response()->json(['message' => 'Penumpang tidak ditemukan'], 404);
        }

        $nama = strtoupper($request->nama);
        $kota = strtoupper($request->kota);

        $cekPenumpang = Penumpang::where('nama', $nama)->where('usia', $request->usia)->where('kota', $kota)->where('id_travel', $request->id_travel)->where('id', '!=', $id)->exists();

        if ($cekPenumpang) {
            return response()->json([
                'message' => 'Penumpang sudah terdaftar di travel ini'
            ], 422);
        }

        if ($penumpang->id_travel != $request->id_travel) {
            $travel = Travel::find($request->id_travel);
            if ($travel->kuota <= 0) {
                return response()->json([
                    'message' => 'Kuota travel sudah habis'
                ], 422);
            }

            $travel->kuota -= 1;
            $travel->save();

            $travelLama = Travel::find($penumpang->id_travel);
            if ($travelLama) {
                $travelLama->kuota += 1;
                $travelLama->save();
            }
        }

        $tahunLahir = date('Y') - $request->usia;

        $penumpang->update([
            'nama' => $nama,
            'jenis_kelamin' => $request->jenis_kelamin,
            'kota' => $kota,
            'usia' => $request->usia,
            'tahun_lahir' => $tahunLahir,
            'id_travel' => $request->id_travel
        ]);

        return response()->json([
            'message' => 'Data penumpang berhasil diperbarui',
            'penumpang' => $penumpang
        ], 200);
    }


    public function destroy($id)
    {
        $penumpang = Penumpang::find($id);

        $travel = Travel::where('id', $penumpang->id_travel)->first();

        if ($travel) {
            $travel->kuota += 1;
            $travel->save();
        }

        $penumpang->delete();

        return response()->json([
            'message' => 'Berhasil menghapus data penumpang'
        ], 200);
    }
}


