import React, { useRef, useEffect } from 'react';

import classes from './notificationBox.module.css';
import Notification from './notification';

const NotificationBox = ({ setShowNotificationBox }) => {

    const notificationBox = useRef();
    // useEffect(() => {
    //     setTimeout(() => {
    //         notificationBox.current.focus();
    //     }, 10)
    // }, []);

    function blurHanlder(){
        setShowNotificationBox(false);
    }
    return (
        <div
            tabIndex={0}
            ref={notificationBox}
            onBlur={blurHanlder} 
            className={classes.mainContainer}
        >
            <div className={classes.triangle}></div>
            <div className={classes.notificationBox}>
                <h5 className={classes.notificationHeading}>Notifications</h5>
                <div className={classes.notificationContainer}>
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={false}
                    />
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={false}
                    />
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={true}
                    />
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={true}
                    />
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={true}
                    />
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={true}
                    />
                    <Notification
                        reportName="Report Name"
                        reportStatus="Complete"
                        date={{ date: '23rd July', time: '12:30 pm' }}
                        readStatus={true}
                    />
                </div>
                <button className={classes.viewAllBtn}>View All</button>
            </div>
        </div>
    );
}

export default NotificationBox;
