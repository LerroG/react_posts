import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import { PostService } from '../api/PostService';
import MyLoader from '../components/UI/loader/MyLoader';

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data);
	});
	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsByPostId(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);

	return (
		<div>
			<h1>Страница поста {params.id}</h1>
			{isLoading ? (
				<MyLoader />
			) : (
				<div>
					{post.id}. {post.title}
				</div>
			)}
			<h1>Коментарии</h1>
			{isComLoading ? (
				<MyLoader />
			) : (
				<div>
					{comments.map((comm) => (
						<div key={comm.id}>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PostIdPage;
