package com.lrm.service;

import com.lrm.po.Comment;

import java.util.List;

/**
 * Created by Song on 2019/10/22.
 */
public interface CommentService {

    List<Comment> listCommentByBlogId(Long blogId);

    Comment saveComment(Comment comment);
}
