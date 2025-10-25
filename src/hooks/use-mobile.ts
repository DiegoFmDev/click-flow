// import * as React from "react"

// const MOBILE_BREAKPOINT = 768

// export function useIsMobile() {
//     const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT)

//     React.useEffect(() => {
//         const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT -1}px)`)
//         const handleChange = (e: MediaQueryListEvent) => {
//             setIsMobile(e.matches)
//         }
//         setIsMobile(mediaQuery.matches)

//         mediaQuery.addEventListener("change", handleChange)

//         return() => mediaQuery.removeEventListener("change", handleChange)
//     }, [])

//     return isMobile
// }


// 1ra VERSION

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT -1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return() => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}