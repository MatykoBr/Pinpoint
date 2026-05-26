import { map } from "@/routes";
import { Head } from "@inertiajs/react";
import { Suspense, useEffect, useState, lazy } from "react";

const MapDisplay = lazy(() => import("@/components/map-display"));

export default function Map() {
    const [isClient, setIsClient] = useState(false);

    const locations: { id: number; position: [number, number]; label: string }[] = [
        { id: 1, position: [52.5200, 13.4050], label: "Berlin" },
        { id: 2, position: [48.1351, 11.5820], label: "München" },
        { id: 3, position: [53.5511, 9.9937], label: "Hamburg" },
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    return (
        <>
            <Head title="Map" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {isClient ? (
                        <Suspense fallback={<div className="h-[100%] flex items-center justify-center bg-gray-100">Loading map data...</div>}>
                            <MapDisplay waypoints={locations} />
                        </Suspense>
                    ) : (
                        <div className="h-[100%] flex items-center justify-center bg-gray-100">Preparing map...</div>
                    )}
                </div>
            </div>
        </>
    );
}

Map.layout = {
    breadcrumbs: [
        {
            title: 'Map',
            href: map(),
        }
    ],
};