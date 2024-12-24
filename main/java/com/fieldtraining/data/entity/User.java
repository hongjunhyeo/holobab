package com.fieldtraining.data.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fieldtraining.ClassBoard.entity.ClassBoard;
import com.fieldtraining.FaqBoard.entity.FaqBoard;
import com.fieldtraining.FormBoard.entity.FormBoard;
import com.fieldtraining.NoticeBoard.entity.NoticeBoard;
import com.fieldtraining.OperationBoard.entity.OperationBoard;
import com.fieldtraining.PracticeBoard.entity.PracticeBoard;
import com.fieldtraining.RatingBoard.entity.RatingBoard;
import com.fieldtraining.ReferenceBoard.entity.ReferenceBoard;
import com.fieldtraining.UnionBoard.entity.UnionBoard;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_user")
@Builder
public class User implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;


	@Column(nullable = false, unique = true)
	private String userId;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String role;

	@Column(nullable = false)
	private boolean isApproval;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Student studentDetail;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Teacher teacherDetail;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Professor professorDetail;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private CollegeManager collegeManagerDetail;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private SchoolManager schoolManagerDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PracticeBoard> practiceDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ClassBoard> classDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<FaqBoard> faqDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<FormBoard> formDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<NoticeBoard> noticeDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OperationBoard> operationDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RatingBoard> ratingDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ReferenceBoard> referenceDetail;

	@JsonBackReference
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UnionBoard> unionDetail;

	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private Set<String> roles = new HashSet<>();

	public void setRoles(List<String> roles) {
		this.roles.clear(); // 기존 역할을 지우고
		this.roles.addAll(roles); // 새로운 역할을 추가
	}

	public void addRole(String role) {
		if (!this.roles.contains(role)) { // 역할이 이미 없다면 추가
			this.roles.add(role);
		}
	}

	public void removeRole(String role) {
		this.roles.remove(role); // 역할 삭제
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)  // 수정: 직렬화 시에도 읽을 수 있도록
	@Override
	public String getUsername() {
		return this.userId;
	}

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)  // 수정: 인증 정보 직렬화 시 필요한 필드일 경우
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)  // 수정
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)  // 수정
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.READ_ONLY)  // 수정
	@Override
	public boolean isEnabled() {
		return true;
	}
}
