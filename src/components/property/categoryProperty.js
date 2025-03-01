import axios from 'axios'
import React, { Component } from 'react'
import { BASE_URL } from '../../projectString'
import AppDownload from '../home/app-download'
import defaultImage from '../../../src/web-assets/img/icon-256x256.png';
import Footer from '../layouts/footer'
import Header from '../layouts/header'
import PopularAreaInDubai from './popularAreaInDubai'
import PopularCategory from './popularCategory'
import PopularResidentialForRend from './popularResidentialForRend'
import SearchArea from './searchArea'
import SubcategoryList from './subcategoryList';
import Loader from '../Loader';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default class categoryProperty extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            category_id: '',
            popularCategory: [],
            subcategory: [],
            loaderStatus: false,
            latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
            longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
        }
    }

    componentWillMount(){

        this.setState({
            category_id: this.props.match.params.id,
            loaderStatus: true,
        }, () => {

            axios({
                url: `${BASE_URL}/customer/get/property`,
                method: 'POST',
                data: {
                    category_id: this.state.category_id,
                    latitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.latitude,
                    longitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.longitude,
                    city: localStorage.getItem('city_id'),
                    country: localStorage.getItem('country_id'),
                }

            }).then(response => {

                if(response.data.status == 'success'){
                    
                    this.setState({
                        popularCategory: response.data.data.property.subcategory,
                        subcategory: response.data.data.subcategory,
                    })
                }

                this.setState({
                    loaderStatus: false,
                });

            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            });
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        
        // if(this.state.category_id != nextProps.match.params.id){
            
            this.setState({
                category_id: nextProps.match.params.id,
                loaderStatus: true,
            }, () => {

                axios({
                    url: `${BASE_URL}/customer/get/property`,
                    method: 'POST',
                    data: {
                        category_id: this.state.category_id,
                        latitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.latitude,
                        longitude: localStorage.getItem('country_id') || localStorage.getItem('city_id') ? 0 : this.state.longitude,
                        city: localStorage.getItem('city_id'),
                        country: localStorage.getItem('country_id'),
                    }

                }).then(response => {
        
                    if(response.data.status == 'success'){
                        
                        this.setState({
                            popularCategory: response.data.data.property.subcategory,
                            subcategory: response.data.data.subcategory,
                        });
                    }

                    this.setState({
                        loaderStatus: false,
                    });
        
                }).catch((error) => {
                    this.setState({
                        loaderStatus: false,
                    });
                });

            });
            
        // }
    }

    changeCategory = (category_id) => {

        this.setState({
            category_id: category_id,
            loaderStatus: true,
        }, () => {

            axios({
                url: `${BASE_URL}/customer/get/property`,
                method: 'POST',
                data: {
                    category_id: this.state.category_id,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    city: localStorage.getItem('city_id'),
                }
            }).then(response => {
                
                if(response.data.status == 'success'){
    
                    this.setState({
                        popularCategory: response.data.data.property.subcategory,
                        subcategory: response.data.data.subcategory,
                    })
                }

                this.setState({
                    loaderStatus: false,
                });
    
            }).catch((error) => {
                this.setState({
                    loaderStatus: false,
                });
            });

        });
    }

    render() {

        let category = this.props.match.params.id
        let {category_id, popularCategory, subcategory} = this.state;
        let loaderStatus = this.state.loaderStatus;
        
        return (
            <div id="page" className="site-page">
            {loaderStatus == true ? <Loader /> : ''}
            <>
                <Header />
                <SearchArea category={category} changeCategoryToggle={this.changeCategory} type="list" />
                
                {/* <!-- =====[SECTION CATEGORY CAROUSEL] **===== --> */}
                <section className="section-category-carousel">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="section-title text-center">Popular Categories</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {/* <div id="categoryCarousel" className="owl-carousel category-carousel"> */}
                                <OwlCarousel
                                className='owl-theme owl-carousel category-carousel'
                                loop={true}
                                margin={14}
                                nav={true}
                                dots={true}
                                slideBy={3}
                                autoplay={true}
                                navText={['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']}
                                responsive={{
                                    0:{
                                        items:2,
                                    },
                                    768:{
                                        items:2,
                                        margin: 30,
                                    },
                                    992:{
                                        items:3,
                                        margin: 30,
                                    },
                                    1200:{
                                        items:5,
                                        margin: 30,
                                    }
                                }}>

                                    {popularCategory && popularCategory.map((popularCategory, index) => {
                                        
                                        return <PopularCategory key={index} id={popularCategory.id} category_id={popularCategory.category_id} name={popularCategory.name} image={popularCategory.image} />
                                    })}
                                </OwlCarousel>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- =====[SECTION PLACE PANEL] **===== --> */}
                
                {/* <PopularAreaInDubai /> */}

                {/* <!-- =====[SECTION]===== --> */}
                
                <section className="section-no-padding pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="section-title text-center">{subcategory[0] ? subcategory[0].name : ''}</h2>
                            </div>
                        </div>
                        <div className="row row-product-panel">
                            
                        {subcategory[0] ? subcategory[0].ads.map((ads, index) => {
                            
                            if(index < 5){
                                return <PopularResidentialForRend key={index} ads={ads} />
                            }

                        }) : ''}
                            
                        </div>
                    </div>
                </section>

                {/* <!-- =====[SECTION PLACE LIST]===== --> */}
                <section className="section-place-list">
                    <div className="container">
                        
                        {subcategory && subcategory.map((subcategory, index) => {
                            if(index != 0){
                                return <SubcategoryList key={index} subcategory={subcategory} />
                            }
                        })} 

                    </div>
                </section>

                <AppDownload />
                <Footer />
            </>
         </div>
        )
    }
}
