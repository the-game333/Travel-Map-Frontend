import './app.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { Star } from '@material-ui/icons';

import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import RestaurantMenuTwoToneIcon from '@mui/icons-material/RestaurantMenuTwoTone';
import LocalCafeTwoToneIcon from '@mui/icons-material/LocalCafeTwoTone';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
import LocalGasStationTwoToneIcon from '@mui/icons-material/LocalGasStationTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

import axios from 'axios';
import { format } from 'timeago.js';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem('user')
  );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [type, setType] = useState('Address');
  const [star, setStar] = useState(1);
  const [pinDeleted, setPinDeleted] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      type,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post('api/pins', newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      setType('Address');
      setStar(1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to delete this pin ?')) {
      try {
        await axios.delete(`api/pins/${id}`);
        // console.log(res);
        setPinDeleted(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get('api/pins');
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
    setPinDeleted(false);
  }, [pinDeleted]);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem('user');
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        transitionDuration="50"
        mapStyle="mapbox://styles/abirskdr/clbl3nvsp008m14qnz9i5ds97"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={currentUsername && handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              {p.type === 'Address' ? (
                <RoomTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#DC143C',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'Hospital' ? (
                <LocalHospitalTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#FF0000',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'Hotel' ? (
                <HotelTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '	#FF00FF',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'Restaurant' ? (
                <RestaurantMenuTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#FF6347',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'Cafe' ? (
                <LocalCafeTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '	#8B4513',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'Bank' ? (
                <AccountBalanceTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#556B2F',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'Petrol Pump' ? (
                <LocalGasStationTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#000000',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'EV Station' ? (
                <EvStationTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#00FA9A',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'School' ? (
                <SchoolTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#708090',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : p.type === 'University' ? (
                <SchoolTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#000080',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              ) : (
                <ShoppingCartTwoToneIcon
                  style={{
                    fontSize: 9 * viewport.zoom,
                    color:
                      currentUsername === p.username ? '#0E76A8' : '#800080',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              )}
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>{p.type}</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                  {currentUsername === p.username ? (
                    <button
                      className="btnDelete"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <RoomTwoToneIcon
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: 'tomato',
                  cursor: 'pointer',
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Type</label>
                  <select onChange={(e) => setType(e.target.value)}>
                    <option value="Address">Address</option>
                    <option value="Hospital">Hospital</option>
                    <option value="School">School</option>
                    <option value="University">University</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Bank">Bank</option>
                    <option value="Petrol Pump">Petrol Pump</option>
                    <option value="EV Station">EV Station</option>
                    <option value="Shop">Shop</option>
                  </select>
                  <label>Description</label>
                  <textarea
                    type="text"
                    required
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              Log in
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowRegister(true);
                setShowLogin(false);
              }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;