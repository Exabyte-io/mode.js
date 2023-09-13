/* eslint-disable */
module.exports = {
    pb: {
        qm: {
            abin: {
                gw: [
                    { path: "/qm/wf/none/pw/none" },
                    { regex: "\\/qm\\/wf\\/none\\/psp\\/.*" },
                    { regex: "\\/qm\\/wf\\/none\\/smearing\\/.*" },
                    { regex: "\\/qm\\/wf\\/none\\/tetrahedron\\/.*" },
                    { path: "/opt/diff/ordern/cg/none" },
                    { path: "/linalg/diag/none/davidson/none" },
                ],
            },
            dft: {
                ksdft: {
                    lda: [
                        { path: "/qm/wf/none/pw/none" },
                        { regex: "\\/qm\\/wf\\/none\\/psp\\/.*" },
                        { regex: "\\/qm\\/wf\\/none\\/smearing\\/.*" },
                        { regex: "\\/qm\\/wf\\/none\\/tetrahedron\\/.*" },
                        { path: "/opt/diff/ordern/cg/none" },
                        { path: "/linalg/diag/none/davidson/none" },
                    ],
                    gga: [
                        { path: "/qm/wf/none/pw/none" },
                        { regex: "\\/qm\\/wf\\/none\\/psp\\/.*" },
                        { regex: "\\/qm\\/wf\\/none\\/smearing\\/.*" },
                        { regex: "\\/qm\\/wf\\/none\\/tetrahedron\\/.*" },
                        { path: "/opt/diff/ordern/cg/none" },
                        { path: "/linalg/diag/none/davidson/none" },
                    ],
                    hybrid: [
                        { path: "/qm/wf/none/pw/none" },
                        { regex: "\\/qm\\/wf\\/none\\/psp\\/.*" },
                        { regex: "\\/qm\\/wf\\/none\\/smearing\\/.*" },
                        { regex: "\\/qm\\/wf\\/none\\/tetrahedron\\/.*" },
                        { path: "/opt/diff/ordern/cg/none" },
                        { path: "/linalg/diag/none/davidson/none" },
                        { regex: "\\/qm\\/wf\\/none\\/ao\\/pople.*" },
                    ],
                },
            },
        },
    },
    st: {
        det: {
            ml: {
                re: [
                    { path: "/none/none/none/linear/least_squares" },
                    { path: "/none/none/none/linear/ridge" },
                    { path: "/none/none/none/kernel_ridge/least_squares" },
                ],
            },
        },
    },
};