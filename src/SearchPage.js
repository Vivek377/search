import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';
import { useStateValue } from './StateProvider';
import useGoogleSearch from './useGoogleSearch';
import Search from './Search';
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RoomIcon from '@mui/icons-material/Room';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Sidebar } from 'primereact/sidebar';

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  const [visible, setVisible] = useState(false);

  const { data } = useGoogleSearch(term); // Live API Call
  const stateParam = new URLSearchParams(window.location.search).get("q");
  // console.log(visible);

  return (
    <div className='searchPage'>


      <div className='searchPage__header'>
        <Link to="/">
          <img
            className='searchPage__logo'
            src='woogle.png'
            alt="googlelogo"
          />
        </Link>
        <div className='searchPage__headerBody'>
          <Search hideButtons stateParam={stateParam} />
          <div className='searchPage__options'>
            <div className='searchPage__optionsLeft'>
              <div className='searchPage__option'>
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className='searchPage__option'>
                <DescriptionIcon />
                <Link to="/news">News</Link>
              </div>
              <div className='searchPage__option'>
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className='searchPage__option'>
                <LocalOfferIcon />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className='searchPage__option'>
                <RoomIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className='searchPage__option'>
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className='searchPage__optionsRight'>
              <div className='searchPage__option'>
                <Link to="/settings">Settings</Link>
              </div>
              <div className='searchPage__option'>
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className='searchPage__results'>
          <p className='searchPage__resultCount'>
            About {data?.searchInformation?.formattedTotalResults} results (
            {data?.searchInformation?.formattedSearchTime} seconds) for{" "}
            <strong>{term}</strong>
          </p>
          {data?.items?.map(item => (
            <div className='searchPage__result'>
              <text className='searchPage__displayLink' onClick={() => setVisible(true)} href={item.link}>
                {/* {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className='searchPage__resultImage'
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=''
                    />
                  )} */}
                {item.displayLink} ▽
                <Sidebar className='sidebar p-sidebar-full' visible={visible} position="right" onHide={() => setVisible(false)}>
                  <object height={475} width={315} data={item.link}>pdf not available</object>
                </Sidebar>
              </text>
              <text className='searchPage__resultTitle' onClick={() => setVisible(true)} href={item.link}>
                <h2>{item.title}</h2>
                <Sidebar className='sidebar' visible={visible} position="right" onHide={() => setVisible(false)}>
                  <object height={475} width={315} data={item.link}>pdf not available</object>
                </Sidebar>
              </text>
              <p className='searchPage__resultSnippet'>
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;