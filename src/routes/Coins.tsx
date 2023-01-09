import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
	padding: 2px 20px;
	max-width: 500px;
	margin: 0 auto;
`;
const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
	font-weight: 700;
	margin-bottom: 10px;
	padding: 20px;
	border-radius: 15px;
	a {
		transition: color 0.2s ease-in;
		display: block;
		/*칸에도 hover되게 설정*/
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-weight: 700;
	font-size: 50px;
`;

interface CoinsObject {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	//CoinsObject라고 typescript에게 알려주기
	const [coins, setCoins] = useState<CoinsObject[]>([]);
	useEffect(() => {
		//바로 실행함수 ()();
		(async () => {
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			const json = await response.json();
			setCoins(json.slice(0, 100));
			console.log(coins);
		})();
	}, []);
	return (
		<Container>
			<Header>
				<Title>COINS</Title>
				<img src="/bitcoin.png" />
			</Header>
			<CoinsList>
				{coins.map((coin) => (
					<Coin key={coin.id}>
						<Link to={`/${coin.name}`}>{coin.name}</Link>
					</Coin>
				))}
			</CoinsList>
		</Container>
	);
}

export default Coins;
