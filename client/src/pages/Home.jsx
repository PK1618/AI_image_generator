import React, { useEffect, useState } from 'react'
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
        if (data?.length > 0) {
                return data.map((post) => <Card key={post._id} {...post} />)
        }
        return (
                <h2 className='mt-5 font-bold text-[#e56f56] text-xl uppercase'>
                        {title}
                </h2>
        )

}

function Home() {

        const [loading, setLoading] = useState(false);
        const [allPosts, setAllPosts] = useState(null);
        const [searchText, setSearchText] = useState('');
        const [searchedResults, setSearchedResults] = useState(null);
        const [searchTimeout, setSearchTimeout] = useState(null);


        const fetchPosts = async () => {
                setLoading(true);
                try {

                        const response = await fetch(
                                'https://ai-image-generator-ua5s.onrender.com/api/v1/posts', {
                                method: 'GET',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                        })
                        if (response.ok) {
                                const result = await response.json();
                                setAllPosts(result.data.reverse());
                        }
                } catch (err) {
                        alert(err)
                }
                finally {
                        setLoading(false);
                }
        }
        useEffect(() => {
                fetchPosts();
        }, [])

        const handleSearchChange = (e) => {
                clearTimeout(searchTimeout);

                setSearchText(e.target.value);
                setSearchTimeout(
                        setTimeout(() => {
                                const searchResults = allPosts.filter((item) =>
                                        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                        item.prompt.toLowerCase().includes(searchText.toLowerCase()));

                                setSearchedResults(searchResults);
                        }, 500)
                )
        }

        return (
                <section className='max-w-7xl mx-auto'>
                        <div>
                                <h1 className='font-extrabold text-[#222328]
                                text-[32px]'>The Community Showcase</h1>
                                <p className='mt-2 text-[#aeaeae] text-[14px] 
                                max-w[500px]'>Discover a showcase of mesmerizing
                                        and artistically designed AI-generated visuals.
                                </p>
                        </div>
                        <div className='mt-16'>
                                <FormField
                                        labelName='Search Posts'
                                        type='text'
                                        name='text'
                                        placeholder="Search posts"
                                        value={searchText}
                                        handleChange={handleSearchChange} />
                        </div>
                        <div className='mt-10'>
                                {loading ? (
                                        <div className='flex justify-center items-center'>
                                                <Loader />
                                        </div>
                                ) : (
                                        <>
                                                {searchText && (
                                                        <h2 className='font-medium text-[#aeaeae]
                                                text-xl mb-3'>
                                                                Showing results for <span className='text-[#222328]'>{searchText}</span>
                                                        </h2>
                                                )}
                                                <div className='grid lg:grid-cols-4 sm:grid-cols-3
                                                xs:grid-cols-2 grid-cols-1 gap-3'>
                                                        {searchText ? (
                                                                <RenderCards
                                                                        data={searchedResults}
                                                                        title='No searched results found'
                                                                />) : (
                                                                <RenderCards
                                                                        data={allPosts}
                                                                        title='No Posts Yet'
                                                                />

                                                        )}
                                                </div>
                                        </>
                                )}
                        </div>
                </section>
        )
}

export default Home