import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

interface ActiveLinkProps {
    children: JSX.Element,
    activeClassName: string,
    as?: any,
    href: string,
}

const ActiveLink = ({ children, activeClassName, ...props } : ActiveLinkProps) => {
    const { asPath, isReady } = useRouter()

    const child = Children.only(children)
    const childClassName = child.props.className || ''
    const [className, setClassName] = useState(childClassName)

    useEffect(() => {
        // Check if the router fields are updated client-side
        if (isReady) {
            // Dynamic route will be matched via props.as
            // Static route will be matched via props.href
            const link = new URL(props.as || props.href, location.href);

            const linkPathname = `${link.pathname}${link.hash}`
            // Using URL().pathname to get rid of query and hash
            const active = new URL(asPath, location.href)
            const activePathname = `${active.pathname}${active.hash}`

            const newClassName =
                linkPathname === activePathname
                    ? `${childClassName} ${activeClassName}`.trim()
                    : childClassName
           
            if (newClassName !== className) {
                setClassName(newClassName)
            }
        }
    }, [
        asPath,
        isReady,
        props.as,
        props.href,
        childClassName,
        activeClassName,
        setClassName,
        className,
    ])

    return (
        <Link {...props}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    )
}

ActiveLink.propTypes = {
    activeClassName: PropTypes.string.isRequired,
}

export default ActiveLink