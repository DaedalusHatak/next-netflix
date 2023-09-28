export default function BaseCard({header,desc}:any){
    return (
        <div
        className="tv"
      >
        <div className="screen text">
          <h2>{header }</h2>
          <p>{ desc }</p>
        </div>
        <div className="screen">
          <slot></slot>
        </div>
      </div>
    )
}