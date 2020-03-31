import React from 'react'
import Button from '@material-ui/core/Button'

const BackButton = () => {
    return (
            <Button variant="outlined"  onClick={() => window.history.back()}>Back</Button>

    )
}
export default BackButton