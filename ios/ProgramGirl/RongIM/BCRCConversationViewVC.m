//
//  BCRCConversationViewVC.m
//  BCRongCloud
//
//  Created by chen on 2017/10/13.
//  Copyright © 2017年 chen. All rights reserved.
//

#import "BCRCConversationViewVC.h"
#import "BCGroupAnnouncementVC.h"
#import "BCGroupSettingsVC.h"
@interface BCRCConversationViewVC ()
@end

@implementation BCRCConversationViewVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  [self createNavigationBarView];
}
- (void)createNavigationBarView{
  if (@available(iOS 11.0, *)) {
    self.conversationMessageCollectionView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
  } else {
    // Fallback on earlier versions
  }
  /*
  //去掉系统返回键后文字
  //  [[UIBarButtonItem appearance] setBackButtonTitlePositionAdjustment:UIOffsetMake(-100,0) forBarMetrics:UIBarMetricsDefault];
  
  //  [self.navigationItem setHidesBackButton:YES animated:YES];
  //  UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"back"] style:UIBarButtonItemStylePlain target:self action:@selector(back:)];
  //  self.navigationItem.leftBarButtonItem = item;
  */
  [self.navigationController.navigationBar setTintColor:[UIColor whiteColor]];//设置导航栏返回按钮的颜色
  if(self.conversationType == ConversationType_GROUP){
    //如果是群组，添加群公告，右按钮
    UIButton *btn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 30, 30)];
//    btn.backgroundColor = [UIColor redColor];
    //[btn setTitle:@"群公告" forState:UIControlStateNormal];
    //[btn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [btn setImage:[UIImage imageNamed:@"Group_icon"] forState:UIControlStateNormal];
    [btn setImageEdgeInsets:UIEdgeInsetsMake(2.5, 0, 2.5, 0)];
    btn.adjustsImageWhenHighlighted = NO;
    [btn addTarget:self action:@selector(rightBtnClick:) forControlEvents:UIControlEventTouchUpInside];
    
    //针对 iOS11适配改写
    UIView *containVew = [[UIView alloc] initWithFrame:btn.bounds];
    [containVew addSubview:btn];
    
    UIBarButtonItem *rightButton = [[UIBarButtonItem alloc] initWithCustomView:containVew];
    self.navigationItem.rightBarButtonItem = rightButton;
    
    //UIBarButtonItem *rightButton = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"Group_icon"] style:UIBarButtonItemStylePlain target:self action:@selector(rightBtnClick:)];
    //self.navigationItem.rightBarButtonItem = rightButton;
    
    
    //刷新群组成员信息
    //[self refreshGroupMembers];
  }
}
- (void)back:(id)sender{
  [self.navigationController popViewControllerAnimated:YES];
}
- (void)rightBtnClick:(id)sender{
//  BCGroupAnnouncementVC *vc = [[BCGroupAnnouncementVC alloc] init];
//  vc.groupId = self.targetId;
//  [self.navigationController pushViewController:vc animated:YES];
  BCGroupSettingsVC *vc = [[BCGroupSettingsVC alloc] init];
  vc.groupId = self.targetId;
  [self.navigationController pushViewController:vc animated:YES];
}
- (void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

#pragma mark - 融云回调方法
//发送按钮点击方法
- (void)didSendMessage:(NSInteger)status content:(RCMessageContent *)messageContent{
  NSLog(@"%ld", (long)status);
  if(status == 0){
    if(self.conversationType == ConversationType_GROUP){
      NSLog(@"消息发送成功");
      [self updateActivitySort];
    }
  }
}
//@符号输入回调
- (void)showChooseUserViewController:(void (^)(RCUserInfo *selectedUserInfo))selectedBlock
                              cancel:(void (^)())cancelBlock{
  return;
}

//通知服务器修改活动的排序
- (void)updateActivitySort{
  [BCAFRequest updateActivitySort:[NSString stringWithFormat:GroupReplyTimeUrl, self.targetId] WithBlock:^(id obj, NSError *error) {
    
  }];
}
//刷新群组成员
- (void)refreshGroupMembers{
  dispatch_async(dispatch_get_global_queue(0, 0), ^{
    [[BCRCIMDataSource shareInstance] getGroupMemberInfo:self.targetId callback:^(NSArray * arr) {
      if (!arr.count) {
        return;
      }
      for (RCUserInfo *user in arr) {
        if ([user.portraitUri isEqualToString:@""]) {
            user.portraitUri = UserThumb;
        }
        [[RCIM sharedRCIM] refreshUserInfoCache:user withUserId:user.userId];
      }
    }];
  });
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
