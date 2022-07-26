import { Component } from 'react/cjs/react.production.min';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
        imgStyle: {objectFit: "hover"}
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        //! this.timerId = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    
    onCharLoaded = (char) => {
        if(char.description === ''){
            char.description = "There is no data about this character" 
        } 
        if(char.description.length > 205 ){
            char.description = char.description.slice(0, 205) + '...';
        }
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading:true
        })
    }

    onError = () => { 
        this.setState({
            loading: false,
            error: true
        })
    }
    
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)+ 1011000 );
        this.onCharLoading();
        this.marvelService
            .getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() { 
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null; 

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View =({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    
    const imgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    let imgStyle = {objectFit: "cover"}
    if(char.thumbnail === imgUrl ) {
        imgStyle = {objectFit: "contain"}
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={imgStyle} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;