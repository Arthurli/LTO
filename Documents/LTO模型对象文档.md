#LTO 数据模型文档

##Class: Account
这是用户账号模型

属性 	    |  类型 	 |  描述
-----------|---------|--------
id			 | Number  | 用户唯一id
uuid       | String  | 用户唯一uuid
name		 | String	 | 用户用户名 不能为空
password   | String  | 用户密码
created_at | time    | 用户创建时间

##Class: Label
用户账号下的Label, 用于存放todo的容器，拥有两个默认label [Today, All]

属性 	    |  类型 	 |  描述
-----------|---------|--------
id			 | Number  | label唯一id 默认label All 为0， 默认label Today 为1
uuid       | String  | label唯一uuid
user_id    | String  | 拥有者的唯一uuid
user_type  | enum    | 拥有者类型 in [ user, group ]
name		 | String  | label名字
type       | enum    | label 类型 in [ default, user_create ]
created_at | time    | label创建时间
updated_at | time    | label刷新时间

##Class: Todo
任务对象

属性 	    |  类型 	 |  描述
-----------|---------|--------
id   		 | String  | 任务唯一id
uuid       | String  | 任务唯一uuid
title      | String  | 任务title
body       | String  | 任务具体内容，此属性可以为空
owner		 | String  | 创建任务的人的唯一uuid
terminator | String  | 完成任务的人的唯一uuid
type       | enum    | 任务类型 分为个人任务和群组任务 in [ user, group ] 
status     | enum    | 任务状态 in [ default, invalid, done ]
expired_at | time    | 过期时间 此处可以为空
created_at | time    | todo创建时间
updated_at | time    | todo刷新时间


##以下模型为高级版模型

##Class: Group
群组对象

属性 	    |  类型 	 |  描述
-----------|---------|--------
id         | Number  | 群组唯一id
uuid       | String  | 群组唯一uuid
name       | String  | 群组名称
owner      | String  | 创建群组的人的唯一uuid
created_at | time    | todo创建时间
updated_at | time    | todo刷新时间


##Class: Comment
针对任务的评论

属性 	    |  类型 	 |  描述
-----------|---------|--------
id			 | Number  | 评论唯一id
uuid       | String  | 评论唯一uuid
todo_id    | String  | 评论目标todo的唯一uuid
user_id    | String  | 评论者唯一uuid
user_name  | String  | 评论者姓名
body 		 | String  | 评论
created_at | time    | 评论创建时间
