<?php

namespace App\DataFixtures;

use App\Entity\Speciality;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Date;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    private $encoder;
    public const COUNT = 6;
    public const USER_REFERENCE = 'user';

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $users = [
            ["roles" => ["ROLE_DOCTOR"], "password" => "Sedki", "username" => "Sedki", "firstname" => "Sedki", "lastname" => "Ghanmi", "email" => "sg@gmail.com", "tel" => "-", "address" => "regus center", "born_at" => new \DateTime("2000-10-10"),
                "specialities" => $this->getRandomSpecialities()],
            ["roles" => ["ROLE_PATIENT"], "password" => "Khaoula", "username" => "Khaoula", "firstname" => "Khaoula", "lastname" => "Boumaiza", "email" => "kb@gmail.com", "tel" => "-", "address" => "regus center", "born_at" => new \DateTime("2000-10-10"), "specialities" => []],
            ["roles" => ["ROLE_PATIENT"], "password" => "Sinda", "username" => "Sinda", "firstname" => "Sinda", "lastname" => "Khadhrani", "email" => "sk@gmail.com", "tel" => "-", "address" => "regus center", "born_at" => new \DateTime("2000-10-10"), "specialities" => []],
            ["roles" => ["ROLE_PATIENT"], "password" => "Zeineb", "username" => "Zeineb", "firstname" => "Zeineb", "lastname" => "Gharssaalah", "email" => "zg@gmail.com", "tel" => "-", "address" => "regus center", "born_at" => new \DateTime("2000-10-10"), "specialities" => []],
            ["roles" => ["ROLE_DOCTOR"], "password" => "Maryem", "username" => "Maryem", "firstname" => "Maryem", "lastname" => "Sehli", "email" => "ms@gmail.com", "tel" => "-", "address" => "regus center", "born_at" => new \DateTime("2000-10-10"), "specialities" => $this->getRandomSpecialities()],
            ["roles" => ["ROLE_DOCTOR"], "password" => "Ahmed", "username" => "Ahmed", "firstname" => "Ahmed", "lastname" => "Ghali", "email" => "ag@gmail.com", "tel" => "-", "address" => "regus center", "born_at" => new \DateTime("2000-10-10"), "specialities" => $this->getRandomSpecialities()],
        ];

        foreach ($users as $key => $data) {
            $user = new User();
            $user->setFirstname($data['firstname']);
            $user->setLastname($data['lastname']);
            $user->setEmail($data['email']);
            $user->setAddress($data['address']);
            $user->setTel($data['tel']);
            $user->setBornAt($data['born_at']);
            $user->setUsername($data['username']);
            $user->setRoles($data['roles']);
            $user->setPassword(
                $this->encoder->encodePassword(
                    $user, $data['password']
                )
            );
            foreach ($data['specialities'] as $speciality) {

                $user->addSpeciality($speciality);
            }

            $manager->persist($user);
            $manager->flush();
            $this->addReference(self::USER_REFERENCE . $key, $user);
        }
    }

    private function getRandomSpecialities()
    {
        $specialities = [];
        for ($i = 0; $i < count(SpecialityFixtures::SPECIALITIES) - 1; $i++) {

            $specialities[] = $this->getReference(
                SpecialityFixtures::SPECIALITY_REFERENCE
                . rand(0, count(SpecialityFixtures::SPECIALITIES) - 1));

        }
        return $specialities;
    }


    public function getDependencies()
    {
        return array(
            SpecialityFixtures::class
        );
    }
}
