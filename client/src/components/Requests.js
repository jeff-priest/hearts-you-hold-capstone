import React from 'react'

export default function Requests () {
    // let para = document.getElementById('para')
    // function charLimit(){
    //     let firstPar
    //     let moreText
    //     let limit = 40
    //     if (para.textContent.length > limit) {
    //          firstPar = para.textContent.slice(0,limit)
    //          moreText = para.textContent.slice(limit)
    //     } return (
    //         <>
    //         <p id='para'> {firstPar} 
    //         <span id='moreText' style={{display:'none'}}>{moreText}</span>
    //         <button id='readMoreBtn' onClick={readMore}>Read More...</button>
    //         </p>
    //         </>
    //     )
    //     }

        function readMore(){
        let readMoreBtn = document.getElementById("readMoreBtn")
        let moreText = document.getElementById("moreText")

        if (moreText.style.display === 'none'){
            readMoreBtn.textContent = 'Read Less';
            moreText.style.display = 'inline';
        }else if (moreText.style.display === 'inline'){
            readMoreBtn.textContent = 'Read More..'
            moreText.style.display = 'none'
        }
        }


    return(
        <div className='listing'>
            <section className='left'>
                <h2>Work Boots</h2>
                <p id='firstPar'>Hi everyone, my name is Señora Maribel. I work at a farm in Grafton County, New Hampshire. I would appreciate support with buying these boots. <span id='moreText' style={{display:'none'}}>There are still many months ahead that have cold mornings and having good quality boots for the farm work I do is so important. Thanks! </span>
                <button id='readMoreBtn' onClick={readMore}> Read More...</button></p>
                <br></br> {/* <--- GET RID OF THIS LATER */}
                <button>Add to cart</button>
            </section>
            <section className='right'>
                <p>$207</p>
                <h4>Señora Maribel</h4>
                <p>Grafton County, NH - Mexico</p>
            </section>
        </div>
    )
}