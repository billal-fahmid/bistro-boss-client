import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../../components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {

    const categories = ['salad' , 'pizza' ,'soup','dessert' ,  'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex)

  

    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category == 'dessert');
    const pizza = menu.filter(item => item.category == 'pizza');
    const soup = menu.filter(item => item.category == 'soup');
    const salad = menu.filter(item => item.category == 'salad');
    const drinks = menu.filter(item => item.category == 'drinks');

    return (
        <div>
              <Helmet>
                <title>Bistro Boss | Order Food</title>
               
            </Helmet>
            <Cover img={orderCover} title={'OUR FOOD'} subTitle={'Would you like to try a dish?'}></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>

                </TabList>

                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default Order;