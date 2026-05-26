import { map } from "@/routes";
import { Head } from "@inertiajs/react";
import { Suspense, useEffect, useState, lazy } from "react";

const MapDisplay = lazy(() => import("@/components/map-display"));

interface Props {
    waypoints: Array<{ id: number; position: [number, number]; label: string }>;
}

export default function Map({ waypoints }: Props) {
    const [isClient, setIsClient] = useState(false);

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
                            <MapDisplay waypoints={waypoints} />
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