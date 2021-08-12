package com.lrm.service;

import com.lrm.po.User;

/**
 * Created by Song on 2019/10/15.
 */
public interface UserService {

    User checkUser(String username, String password);
}
