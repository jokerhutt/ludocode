import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { router } from "@/main.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";

export function useEditPreferences() {

    const qc = useQueryClient()

    return useMutation({
        ...mutations.editPreferences(),
        onSuccess: (payload) => {
            qc.setQueryData(qk.preferences(), payload)
            router.navigate(ludoNavigation.hub.profile.toProfile(payload.userId))
        }
    })

}