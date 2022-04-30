// Set up backend Database with Firebase
// This adds info to Firebase
import { useState, useEffect } from 'react'
import firebase from '../firebase/clientApp';
import { useAuth } from '../context/AuthUserContext';

export function addStudent(uid, class_name, email) {
    const { authUser, loading } = useAuth();
    if (authUser) {
        const rr = firebase.database().ref('users/'+ uid);
        rr.once("value").then(
            function(snapshot) {
                const inst = snapshot.child('institution').val();
                const us = snapshot.child('onyen').val();

                firebase.database().ref('classes/'+inst+'/'+us).once("value")
                .then( function (snap) {
                        snap.forEach(function(classX) {
                            const classN = classX.child('class_name').val();
                            if (classN === class_name) {
                                classX.ref.child('students').push(
                                    {
                                        date_of_form: null,
                                        seat_assignment: null
                                    }
                                );
                                return true;
                            }
                        });
                    }
                );
            }
        );
    }
}

export function addClass(room_name, class_name, creation_date) {
    const { authUser, loading } = useAuth();
    if (authUser) {
        const rr = firebase.database().ref('users/'+ authUser.uid);
        rr.once("value").then(
            function(snapshot) {
                const inst = snapshot.child('institution').val();
                const user = snapshot.child('onyen').val();
                firebase.database().ref("classes/"+inst+"/"+user)
                .push({room_name, class_name, creation_date});
            }
        );
        
    }
}

export function updateEmail(uid, update) {
    firebase.database().ref(`users/${uid}/email`).set(update);
}

export function addUser(uid, name, email, onyen, institution) {
    firebase.database().ref(`users/${uid}`).set(
        {
            name: name,
            email: email,
            onyen: onyen,
            institution: institution,
            isAdmin: false
        }
    );
}

export function retrieveRoom(school, room_name) {
    var toRet = [];
    const rr = firebase.database().ref(`rooms/${school}/${room_name}/seats`);

    rr.once("value").then(
        function (snapshot) {
            var Row = [];
            for (var i = 0; snapshot.hasChild("row" + i); i++) {
                var key = `row${i}`;
                const k = snapshot.child(key).val();
                for (var j = 0; snapshot.child(key).hasChild(`seat${j}`); ++j) {
                    const ch = snapshot.child(key).child(`seat${j}`).child("is_left_hand").val();
                    Row.push([ch, i, j, `${i}, ${j}`]);
                }
                toRet.push(Row);
            }
        }
    );
    return toRet;
}