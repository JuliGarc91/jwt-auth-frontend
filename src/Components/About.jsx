const About = () => {
  return (
    <section className='about'>
     <img className="about" src={'https://res.cloudinary.com/dwygxzqku/image/upload/v1713653231/juli.png'} alt={'Juli'} />
     <div className="about">
        <h3>Juli</h3>
        <div className="git-hub">
            <a href="https://github.com/JuliGarc91">
                <img className="git-hub" src={'https://res.cloudinary.com/dwygxzqku/image/upload/v1713654947/github-mark-white.png'} alt={'github-logo'}/>
            </a>
        </div>
        <em>Programmer & Plant Enthusiast</em>
        <p>
            <strong>Garden Nook</strong> is inspired by my desire to cultivate and share the herbs my family and I incorporate in our everyday dishes and natural remedies.
        </p>
     </div>
    </section>

  )
}

export default About;