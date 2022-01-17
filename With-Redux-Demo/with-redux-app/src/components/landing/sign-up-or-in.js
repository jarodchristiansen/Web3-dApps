import classes from './sign-up-or-in.module.css';

function SignUpOrIn() {
    return (
        <div className={classes.signupholder}>
            <div className={classes.signUpColumn}>
            <div className={classes.signuptext}>
                Sign Up Text
            </div>
            <div className={classes.signUpButtons}>
            <button>Sign Up</button>
            <button>Sign In</button>
            </div>
            </div>
        </div>
    )
}

export default SignUpOrIn