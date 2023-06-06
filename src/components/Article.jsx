import React from 'react';

const Article = ({article}) => {
    return (
        <>
            <h2>{article.title}</h2>
            <h5>
                {
                    article.author && <span>{article.author}, &nbsp;</span>
                }
                {article.published_at}
            </h5>
            <div className="fakeimg mb-2">
                <img className="img-fluid" src={article.url_to_image} alt={article.title} />
            </div>
            <p>{article.content}</p>
            <p>
                {article.description}
            </p>
            <br />
        </>
    );
};

export default Article;