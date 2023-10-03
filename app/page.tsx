import Square from "@/components/button"
import NavBar from "@/components/NavBar";
import SignIn from "@/components/SignIn";
async function getData(){
  const user = await fetch("http://127.0.0.1:3000/api/getUser");
 const res = await user.json();
 console.log("res",res.photo)
 if (!user.ok) {
  // This will activate the closest `error.js` Error Boundary
  throw new Error('Failed to fetch data')
}
return res;

}
export default async function Page() {


const data = await getData();
console.log(data)

  return (
  
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <NavBar user={data}></NavBar>
    <div className="flex flex-col gap-2"> <h1>Hello world</h1>
     <Square value="Browse" navigateTo="/browse"></Square></div>
  <SignIn></SignIn>
  

    </main>
  )
}


