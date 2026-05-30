<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{

    public function map()
    {
        $latestPerUser = DB::table('locations')
            ->select('uid', DB::raw('MAX(created_at) as max_created_at'))
            ->groupBy('uid');

        return Inertia::render('map', [
            'waypoints' => DB::table('locations')
                ->joinSub($latestPerUser, 'latest', function ($join) {
                    $join->on('locations.uid', '=', 'latest.uid')
                        ->on('locations.created_at', '=', 'latest.max_created_at');
                })
                ->leftJoin('users', 'users.id', '=', 'locations.uid')
                ->select('locations.id', 'locations.lat', 'locations.lng', 'users.name as user_name')
                ->get()
                ->map(fn ($location) => [
                    'id' => (int) $location->id,
                    'position' => [(float) $location->lat, (float) $location->lng],
                    'label' => $location->user_name ?? 'Unknown',
                ]),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        //
    }
}
