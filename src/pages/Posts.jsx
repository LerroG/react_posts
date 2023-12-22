import React, { useEffect, useState } from 'react';
import './styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import { PostService } from '../api/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/pages';
import MyPagination from '../components/UI/pagination/MyPagination';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page);
			setPosts(response.data);
			const totalCount = response.headers['x-total-count'];
			setTotalPages(getPagesCount(totalCount, limit));
		}
	);

	useEffect(() => {
		fetchPosts(limit, page);
	}, []);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter((p) => p.id !== post.id));
	};
	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page);
	};

	return (
		<div className='App'>
			<MyButton
				style={{ marginTop: 30 }}
				onClick={() => setModal(true)}
			>
				Создать
			</MyButton>
			<MyModal
				visible={modal}
				setVisible={setModal}
			>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{postError && <h1>Произошла ошибка {postError}</h1>}
			{isPostsLoading ? (
				<div
					style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
				>
					<MyLoader />
				</div>
			) : (
				<PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title='Список постов'
				/>
			)}
			<MyPagination
				page={page}
				changePage={changePage}
				totalPage={totalPages}
			/>
		</div>
	);
};

export default Posts;
