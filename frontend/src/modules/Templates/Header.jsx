
import { Link } from 'react-router-dom';

function Header(){

    return (
        <div className='template-container header-container'>
            <div className='float-left'>
                Todo
            </div>
            <div className='text-right'>
                <Link to="/login">Logout</Link>
            </div>
            
        </div>
    )

}
export { Header };
