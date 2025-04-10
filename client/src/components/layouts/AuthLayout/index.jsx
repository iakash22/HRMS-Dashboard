// /components/layouts/AuthLayout/index.jsx
import React from 'react';
import './style.css';
import Logo from '../../common/Logo'

const AuthLayout = ({ children }) => {
    return (
        <div className='auth-body'>
            <Logo />
            <div className='authLayout-Container'>
                <div className='authLayout-left'>
                    <img
                        src='https://s3-alpha-sig.figma.com/img/0b16/e7d0/e54f5ea69def92a8e3982fc5f2d8a09a?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EYpKsrW-exQisXezbRG0kYkDkrSr~4cYPR68IaMvHqX~2mfU5zO2Hqd8oa78fjXPH16uLRkVHTL8SH4auIVAGuU8cszOjim8LbJylo1opKDr370JaFqBujDWcsD1wjRjLMoZWMNsHEvQjJQ01ZONq7P1ixG6ZkJgt7glcCjETf0OUf04W38P9fNpQ-qyXlFNeZUEl1~bFm8dUIXyx-v~T2ToFSik60xq~U7ypfneDnPbglZ0LUcP~1QZo20yhistwiBgmmXSt-91A83GZ7kAtIWrvRQCGiuiS01-xshefmeG2xeBP8gkZjcxj8Mnlm19SqISQ1W-pcPJDiv5QsF0vw__'
                        alt='Dashboard Preview'
                    />
                    <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h3>
                    <p>
                        Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </p>
                    <div className='circle-box'>
                        <p className='active'></p>
                        <p className=''></p>
                        <p className=''></p>
                    </div>
                </div>
                <div className='authLayout-right'>{children}</div>
            </div>
        </div>
    );
};

export default AuthLayout;
