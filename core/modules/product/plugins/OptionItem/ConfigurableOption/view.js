import React from 'react';
import dynamic from 'next/dynamic';

// import Item from '@plugin_optionitem/ConfigurableOption/Item';
// import Footer from '@plugin_optionitem/components/Footer';

const Item = dynamic(() => import('@plugin_optionitem/ConfigurableOption/Item'), { ssr: true });
const OptionAction = dynamic(() => import('@core_modules/product/plugins/OptionItemAction'), { ssr: true });

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, showAddToCart = true, isGrid = true,
        showSwatches = true, customPos = false, CustomFooter,
        ...other
    } = props;
    const updatedOptions = customPos ? [...options].sort((a, b) => a.options.position - b.options.position) : options;

    if (loading) {
        return (
            <div className="flex flex-col w-full h-auto gap-2">
                <div className="h-4 bg-neutral-100 animate-pulse rounded-full dark:bg-gray-700 w-full" />
                <div className="h-4 bg-neutral-100 animate-pulse rounded-full dark:bg-gray-700 w-full" />
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-2 tablet:gap-4">
                {showSwatches && updatedOptions.map((item, index) => (
                    <Item
                        key={index}
                        option={item.options}
                        selected={selectConfigurable}
                        value={item.value}
                        isGrid={isGrid}
                        {...other}
                        className={`product-configurableOption-${item.options.label}`}
                    />
                ))}
            </div>
            {
                React.isValidElement(CustomFooter)
                    ? React.cloneElement(CustomFooter, {
                        ...other,
                        loading,
                        disabled,
                        showQty,
                        handleAddToCart,
                        qty,
                        setQty,
                        t,
                        showAddToCart,
                    })
                    : (
                        <OptionAction
                            loading={loading}
                            disabled={disabled}
                            showQty={!showQty}
                            handleAddToCart={handleAddToCart}
                            qty={qty}
                            setQty={setQty}
                            t={t}
                            showAddToCart={showAddToCart}
                            {...other}
                        />
                    )
            }

        </>
    );
};

export default ConfigurableView;
