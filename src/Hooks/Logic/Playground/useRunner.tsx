import { useCallback, useState } from "react";


export function useRunner() {
    const [outputLog, setOutputLog] = useState<string[]>([])
    const clearOutput = useCallback(() => setOutputLog([]), [])

    return {outputLog, clearOutput}

}