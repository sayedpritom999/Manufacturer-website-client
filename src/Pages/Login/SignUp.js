import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    const onSubmit = async data => {
      await createUserWithEmailAndPassword(data.email, data.password);  
      await updateProfile({displayName: data.name});  
    };

    if(loading || loading1) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div class="card w-96 lg:w-1/3 mx-auto my-10 bg-base-100 shadow-xl p-5">
                <div class="card-body items-center text-center">
                    <h2 class="card-title">Please Sing Up to proceed</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <input type="Name" {...register("name", { required: true })} placeholder="Name" class="input input-bordered input-info w-full my-3 max-w-md" />
                        <br />
                        <input type="email" {...register("email", { required: true })} placeholder="Email Address" class="input input-bordered input-info w-full my-3 max-w-md" />
                        <br />
                        <input type="password" {...register("password", { required: true })} placeholder="Password" class="input input-bordered input-info w-full my-3 max-w-md" />
                        <br />
                        <input type="submit" class="btn btn-primary" value="Sign Up" />
                    </form>
                </div>
                <p className="text-center">Already Have an Account? <span className="text-primary"><Link to="/login">Login</Link></span></p>
                <div className="mx-auto">
                    <div className="divider">OR</div>
                    <button className="btn btn-outline btn-primary w-full my-3 max-w-md" onClick={() => signInWithGoogle()}>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;