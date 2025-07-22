import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Vnavbar from './Snavbar';

const Book = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:4000/item/${id}`)
      .then((resp) => {
        setItem(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch book data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (!item) return <p>No book found.</p>;

  return (
    <div>
      <Vnavbar />
      <br />
      <div>
        <div style={{ display: "flex", justifyContent: "center", height: "450px" }}>
          {/* Use a fallback if itemImage is missing */}
          <img 
            src={item?.itemImage ? `http://localhost:4000/${item.itemImage}` : '/default-book.png'} 
            alt={`${item.itemtype} Image`} 
            style={{ maxHeight: '100%', maxWidth: '100%' }} 
          />
        </div>
        <h1 className='text-center'>{item.itemtype} - {item._id?.slice(3, 7)}</h1>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div style={{ width: '38%', marginLeft: "150px" }}>
            <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
            <hr style={{ height: "3px", backgroundColor: "black" }} />
            <p style={{ fontSize: "20px" }}>{item.description || "No description available."}</p>
          </div>

          <div style={{ marginRight: '300px' }}>
            <h2 style={{ color: "grey" }}><strong>Info</strong></h2>
            <hr style={{ height: "3px", backgroundColor: "black" }} />
            <p style={{ fontSize: "20px" }}>Price: ₹{item.price || "N/A"}</p>
            <p style={{ fontSize: "20px" }}>Warranty: 1 year</p>
            <p style={{ fontSize: "20px" }}>Seller: {item.userName || "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
