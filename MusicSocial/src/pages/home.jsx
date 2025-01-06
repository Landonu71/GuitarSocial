import LeftBar from '../components/leftBar/leftBar';
import NavBar from '../components/navBar/navBar';
import RightBar from '../components/rightBar/rightBar';


function Home(){
    return(
    <div>
        <NavBar/>
        <div class = "flex-row">
            <LeftBar/>
            
            <RightBar/>
        </div>
        <p>Hello</p>
    </div>
     
   
    )
}
export default Home