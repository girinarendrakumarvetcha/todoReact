import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registrationActions } from '../../actions';


function RegisterPage() {
    const [user, setUser] = useState({
        fullname: 'admin 1',
        userType: 'admin',
        email: 'admin1@gmail.com',
        username: 'admin1',
        password: 'admin123'
    });


    const [submitted, setSubmitted] = useState(false);
    const registration = useSelector(state => state.registration);
    const dispatch = useDispatch();

    // useEffect(() => {
        
    // }, []);

    function handleChange(e) {
        let { name, value } = e.target;
        if(name === 'username'){
            value = value.replace(/\s/g, "");
        }
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);

        if (user.fullname && user.username && user.email && user.password) {
            dispatch(registrationActions.register(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            {registration.message &&
                <div className={`authenticate ${registration.type}`}>{registration.message}</div>
            }
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="fullname" value={user.fullname} onChange={handleChange} className={'form-control' + (submitted && !user.fullname ? ' is-invalid' : '')} />
                    {submitted && !user.fullname &&
                        <div className="invalid-feedback">Full Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>User Type</label>
                    {registration.usertype.length &&
                        <select name='userType' className={'form-control' + (submitted && !user.userType ? ' is-invalid' : '')}  onChange={(e) => handleChange(e)} value={user.userType}  >
                            <option key='0'></option>
                            {registration.usertype.map((type, index) => <option value={type.id} key={type.id}  >{type.value}</option>)}
                        </select>
                    }

                    {submitted && !user.userType &&
                        <div className="invalid-feedback">User Type is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')}   pattern="[^\s]+" />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registration.registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };

