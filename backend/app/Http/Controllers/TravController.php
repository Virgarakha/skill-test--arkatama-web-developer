<?php

namespace App\Http\Controllers;

use App\Models\Travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TravController extends Controller
{
    public function index(){
        $travels = Travel::all();
        return response()->json($travels, 200);
    }

    public function show(){

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'tanggal_keberangkatan' => 'required',
            'kuota' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $travel = Travel::create([
            'nama' => $request->nama,
            'kuota' => $request->kuota,
            'tanggal_keberangkatan'  => $request->tanggal_keberangkatan,
        ]);

        return response()->json([
            'message' => 'Berhasil menmbahkan travel',
            'travel' => $travel
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $travel = Travel::find($id);
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'tanggal_keberangkatan' => 'required',
            'kuota' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $travel->update([
            'nama' => $request->nama,
            'kuota' => $request->kuota,
            'tanggal_keberangkatan'  => $request->tanggal_keberangkatan,
        ]);

        return response()->json([
            'message' => 'Berhasil update travel',
            'travel' => $travel
        ], 200);
    }


    public function destroy($id)
    {
        $travel = Travel::find($id);
        $travel->delete();

        return response()->json([
            'message' => 'Berhasil menghapus Travel'
        ], 200);
    }
}
