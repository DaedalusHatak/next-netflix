import Image from "next/image";

export default function DownloadImg(){
  return (
    
    <>
    
  <Image className="background-img" src="/assets/pot3.png" width={200} height={200} alt="" />
  <div className="video-screen">
    <Image className="videobox" src="/assets/boxshot.png" width={200} height={200} alt="" />
    <div className="status">
      <div>Movie</div>
      <div className="blue">Downloading...</div>
    </div>
    <Image className="download" src="/assets/UQ73Q.gif" width={200} height={200} alt="" />
  </div>


    </>
  )
}