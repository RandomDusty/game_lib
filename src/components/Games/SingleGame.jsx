import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleGameBySlugQuery } from '../../features/api/apiSlice';
import { API_KEY } from '../../utils/constants';
import { useEffect } from 'react';
import { ROUTES } from '../../utils/routes';
import Game from './Game';

const SingleGame = () => {
	const { slug } = useParams();
	const key = API_KEY;
	const navigate = useNavigate();

	const { data, isLoading, isFetching, isSuccess } =
		useGetSingleGameBySlugQuery({ key, slug });

	useEffect(() => {
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess]);

	return !data ? (
		<section className='preloader'>Loading...</section>
	) : (
		<>
			<Game gameInfo={data} />
		</>
	);
};
export default SingleGame;