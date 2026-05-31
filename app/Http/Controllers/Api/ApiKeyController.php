<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiKeyController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $token = $request->user()->createToken($validated['name']);

        return response()->json([
            'id'    => $token->accessToken->id,
            'name'  => $validated['name'],
            'token' => $token->plainTextToken,
        ]);
    }

    public function destroy(Request $request, int $tokenId): RedirectResponse
    {
        $request->user()
            ->tokens()
            ->where('id', $tokenId)
            ->delete();

        Inertia::flash('toast', [
            'type'    => 'success',
            'message' => 'API key revoked successfully.',
        ]);

        return back();
    }
}