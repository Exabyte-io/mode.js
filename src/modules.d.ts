declare module "@exabyte-io/application-flavors.js/lib/js/methods" {
    // TODO: add TS to application-flavors

    interface FilterProps {
        methodList: object[];
        appName?: string;
        version?: string;
        build?: string;
        executable?: string;
        flavor?: string;
    }

    export function filterMethodsByApplicationParameters({
        methodList,
        appName,
        version,
        build,
        executable,
        flavor,
    }: FilterProps): object[];
}
