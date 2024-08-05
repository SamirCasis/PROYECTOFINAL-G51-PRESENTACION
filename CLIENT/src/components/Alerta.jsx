import Alert from 'react-bootstrap/Alert'

const Alerta = ({ error }) => {
    return (
        <>
            {error.error && (
                <Alert variant={error.color}>
                    {error.msg}
                </Alert>
            )}
        </>
    )
}

export default Alerta