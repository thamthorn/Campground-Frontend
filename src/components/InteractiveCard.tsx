'use client'

function InteractiveCard({children, contentName} : {children : React.ReactNode, contentName: string}) {

    function onCardSelected() {
        alert('You selected ' + contentName)
    }

    function oncardMouseAction(event: React.SyntheticEvent) {
        if(event.type == 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg')
            event.currentTarget.classList.add('shadow-2xl')
            event.currentTarget.classList.add('bg-neutral-200')
        }else {
            event.currentTarget.classList.remove('shadow-2xl')
            event.currentTarget.classList.remove('bg-neutral-200')
            event.currentTarget.classList.add('shadow-lg')
            event.currentTarget.classList.add('bg-white')
        }
    }

  return (
    <div className="w-full h-[350px] rounded-lg shadow-lg bg-white"
    // onClick={() => onCardSelected()}
    onMouseOver={(e) => oncardMouseAction(e)}
    onMouseOut={(e) => oncardMouseAction(e)}>
        {children}
    </div>
  )
}

export default InteractiveCard
