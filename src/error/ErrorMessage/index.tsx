import style from "./style.module.scss"

const ErrorMessage = () => {
    return (
        <h2 className={style["error-msg"]}>Sorry... There are some Errors!</h2>
    )
}

export default ErrorMessage