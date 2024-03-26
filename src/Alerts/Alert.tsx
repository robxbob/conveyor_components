import { ReactNode, useEffect } from 'react'
import { Alert as RBAlert } from 'react-bootstrap'

import { CommonProps } from '@/types'

import { useRemoveAlert } from './useRemoveAlert'


export const ALERT_SLOT = 'alert-slot'

export interface AlertProps extends CommonProps {
    alertId: string
    content: ReactNode
    expires?: number
}

export const Alert = ({ alertId, content, expires, id, className, style }: AlertProps) => {
    const removeAlert = useRemoveAlert()

    const defaultStyles = {
        margin: '1px',
        width: '100%'
    }

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined = undefined
        if (expires) {
            timer = setTimeout(() => {
                removeAlert(alertId)
            }, expires)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [expires])

    return (
        <RBAlert
            show={true}
            id={id}
            className={className}
            style={style ?? defaultStyles}
            dismissible
            onClose={() => removeAlert(alertId)}
        >
            {content}
        </RBAlert>
    )
} 