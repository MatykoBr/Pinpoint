import { router } from '@inertiajs/react';
import { ApiKey } from "@/types";
import { KeyRound } from "lucide-react";
import Heading from "@/components/heading";

export type Props = {
    canManageApiKeys?: boolean;
    apiKeys?: ApiKey[];
};

const EmptyState = () => {
    return (
        <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <KeyRound className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="font-medium">No API keys yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
                Create an API key to authenticate with the API
            </p>
        </div>
    );
};

export default function ManageApiKeys(props: Props) {
    const apiKeys = props.apiKeys ?? [];

    const handleDelete = (id: number, onError: () => void) => {
        router.delete('api-keys.destroy', {
            preserveScroll: true,
            onError,
        });
    };

    const handleCreateSuccess = () => {
        router.reload();
    };

    if (!(props.canManageApiKeys ?? false)) {
        return null;
    }

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="API Keys"
                description="Manage your API keys for authenticating with the API"
            />

            {/* <div className="overflow-hidden rounded-lg border border-border">
                {apiKeys.length > 0 ? (
                    apiKeys.map((apiKey) => (
                        <ApiKeyItem
                            key={apiKey.id}
                            apiKey={apiKey}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            <CreateApiKeyButton onSuccess={handleCreateSuccess} /> */}
        </div>
    );
}