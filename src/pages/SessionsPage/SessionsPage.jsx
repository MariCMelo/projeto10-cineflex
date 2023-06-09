import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function SessionsPage() {
    const [movieDetails, setMovieDetails] = useState([]);
    const [day, setDay] = useState([]);
    const { idMovie } = useParams();

    useEffect(() => {
        const urlSession = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes/`;
        axios
            .get(urlSession)
            .then((res) => {
                setMovieDetails(res.data);
                setDay(res.data.days);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                
            });
    }, [idMovie]);

    return (
        <PageContainer>
            <h2>Selecione o horário</h2>
            {day.map((d) => (
                <SessionContainer data-test="movie-day" key={d.weekday}>
                    <p>
                        {d.weekday} - {d.date}
                    </p>
                    {d.showtimes.map((showtime) => (
                        <ButtonsContainer key={showtime.id}>
                            <Link to={`/assentos/${showtime.id}`} data-test="showtime">  
                                <button >{showtime.name}</button>
                            </Link>
                        </ButtonsContainer>
                    ))}
                </SessionContainer>
            ))}

            <FooterContainer data-test="footer">
                <div>
                    <img src={movieDetails.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movieDetails.title}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: wrap;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`