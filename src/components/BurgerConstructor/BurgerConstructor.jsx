import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Total from '../Total/Total';
import classes from './BurgerConstructor.module.css';
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ingredientsPropTypes, _BUN } from '../../utils/standards';

const BurgerConstructor = ({data}) => {

    const total = useMemo(
        () => data.map((item) => item.price).reduce((a, b) => a + b, 0),
        [data]);

    return (
        <>
        <div className={classes.container}>
            <div className={"pl-6"}>
                <ConstructorElement
                    key={0}
                    type="top"
                    isLocked
                    text={data?.[0]?.name}
                    price={data?.[0]?.price}
                    thumbnail={data?.[0]?.image}
                />
            </div>
            <div className={classes.componentList}>
                {data &&
                data.length &&
                data.map((item) => {
                return item.type !== _BUN ? (
                    <div key={item._id} className={classes.item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                    </div>
                    ) : null;
                })}
            </div>
            <div className={"pl-6"}>
                <ConstructorElement
                    key={1}
                    type="bottom"
                    isLocked={true}
                    text={data?.[0]?.name}
                    price={data?.[0]?.price}
                    thumbnail={data?.[0]?.image}
                />
            </div>
            <Total value={total}/>
        </div>
        </>
    );
};


BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes),
};

export default BurgerConstructor;