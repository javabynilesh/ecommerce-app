import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { BrandsService, CategoriesService} from './Services';
import Product from './Product';
function Store(props) {
    let [brands, setBrands] = useState([]);
    let [categories, setCategories] = useState([]);
    let [products, setProducts] = useState([]);
    let [productsToShow, setProductsToShow] = useState([]);
    let [search, setSearch] = useState("");

    //get context
    let userContext = useContext(UserContext);

    useEffect(()=>{
        document.title = "Store - eCommerce";
        (async () => {
            //get brands from db
            let brandsResponse = await BrandsService.fetchBrands();
            let brandsResponseBody = await brandsResponse.json();
            console.log("brandsResponseBody",brandsResponseBody);
            brandsResponseBody.forEach((brand)=>{
                //assign true checkbox value to brand i.e isChecked
                brand.isChecked = true;
            });
            setBrands(brandsResponseBody);

            //get categories from db
            let categoriesResponse = await CategoriesService.fetchCategories();
            let categoriesResponseBody = await categoriesResponse.json();
            console.log("categoriesResponseBody", categoriesResponseBody);
            categoriesResponseBody.forEach((category) =>{
                category.isChecked = true;
            });
            setCategories(categoriesResponseBody);

            //get products from db by product name
            let productResponse = await fetch(`http://localhost:5000/products?productName=${search}`,
                                             { method: "GET" });
            let productResponseBody = await productResponse.json();                                 
            if(productResponse.ok){
                productResponseBody.forEach((product)=>{
                    //set brands
                    product.brand = BrandsService.getBrandByBrandId(brandsResponseBody, product.brandId);
                    
                    //set category
                    product.category = CategoriesService.getCategoryByCategoryId(categoriesResponseBody, product.categoryId);

                    product.isOrdered = false;
                });

                setProducts(productResponseBody);
                setProductsToShow(productResponseBody);
                console.log("productToShow:", productsToShow);
            }
        })();
    },[search])

    //updateBrandIsChecked
    let updateBrandIsChecked = (id)=>{
       let brandsData = brands.map((brand)=>{
            if(brand.id === id) {
                brand.isChecked = !brand.isChecked;
            }
            return brand;
        });

        setBrands(brandsData);
        console.log("brands:",brands);
        console.log("categories:", categories)
        console.log("products:", products);
        updateProductsToShow();
    }

    //updateCategoryIsChecked
    let updateCategoryIsChecked = (id)=>{
        let categoryData = categories.map((category)=>{
            if(category.id === id){
                category.isChecked = !category.isChecked;
            }
            return category;
        });

        setCategories(categoryData);
         console.log("c brands:",brands);
        console.log("c categories:", categories)
        console.log("c products:", products);
        updateProductsToShow();
    }

    //updateProductsToShow
    let updateProductsToShow = ()=>{
        let res = products.filter((prod) => {
                    return (
                            categories.filter((category) =>
                                category.id == prod.categoryId && category.isChecked
                            ).length > 0
                        );
                    })
                    .filter((prod) => {
                         return (
                             brands.filter((brand) =>
                                 brand.id == prod.brandId && brand.isChecked
                             ).length > 0
                         );
                    });

        setProductsToShow(res);
        console.log("res:",res);
    };

    //When the user clicks on Add to Cart function
    let onAddToCartClick = (prod) => {
       (async () => {
        let newOrder = {
            userId: userContext.user.currentUserId,
            productId: prod.id,
            quantity: 1,
            isPaymentCompleted: false,
        };

        let orderResponse = await fetch(`http://localhost:5000/orders`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: { "Content-Type": "application/json" },
        });

        if (orderResponse.ok) {
            //isOrdered = true
            let prods = products.map((p) => {
            if (p.id === prod.id) p.isOrdered = true;
            return p;
            });

            setProducts(prods);
            updateProductsToShow();
        } else {
            console.log(orderResponse);
        }
        })();
    };

    return (
        <div>
            <div className="row py-3 header">
                <div className="col-lg-3">
                <h4>
                    <i className="fa fa-shopping-bag"></i> Store{" "}
                    <span className="badge badge-secondary">
                    {productsToShow.length}
                    </span>
                </h4>
                </div>

                <div className="col-lg-9">
                <input
                    type="search"
                    value={search}
                    placeholder="Search"
                    className="form-control"
                    autoFocus="autofucs"
                    onChange={(event) => {setSearch(event.target.value)}}
                />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 py-2">
                <div className="my-2">
                    <h5>Brands</h5>
                    <ul className="list-group list-group-flush">
                        {brands.map((brand)=>{
                            return(
                                <li className="list-group-item" key={brand.id}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" value="true" checked= {brand.isChecked} onChange={()=>{updateBrandIsChecked(brand.id)}} id={`brand${brand.id}`}/>
                                        <label className="form-check-label" htmlFor={`brand${brand.id}`}> {brand.brandName} </label>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="my-2">
                    <h5>Categories</h5>
                    <ul className="list-group list-group-flush">
                        {categories.map((category)=>(
                            <li className="list-group-item" key={category.id}>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" value="true" checked= {category.isChecked} onChange={()=>{updateCategoryIsChecked(category.id)}} id={`category${category.id}`} />
                                    <label className="form-check-label" htmlFor={`category${category.id}`} > {category.categoryName} </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
                <div className="col-lg-9 py-2">
                <div className="row">
                    {productsToShow.map((prod)=>(
                        <Product 
                            key={prod.id} 
                            product={prod}
                            onAddToCartClick={onAddToCartClick}
                        />
                    ))}
                    
                </div>
                </div>
            </div>    
        </div>
    );
}

export default Store;