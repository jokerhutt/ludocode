import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import { qk } from "../Definitions/qk";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";

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